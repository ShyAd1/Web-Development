import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthResponse, ResetPasswordRequest, ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://127.0.0.1:8000'; // Your FastAPI backend URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in on service initialization
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    // Since your backend doesn't have login endpoint, we'll check against usuarios
    return this.http.get<any[]>(`${this.API_URL}/usuarios/`)
      .pipe(
        map(usuarios => {
          // Find user by email and password (in production, password should be hashed)
          const user = usuarios.find(u =>
            u.email === loginData.email && u.contrasena === loginData.password
          );

          if (user) {
            // Create a mock token (in production, this should come from backend)
            const token = btoa(`${user.email}:${Date.now()}`);
            const mappedUser: User = {
              id: user.idusuarios,
              username: user.nombre,
              email: user.email,
              createdAt: new Date(user.fechaRegistro)
            };

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(mappedUser));
            this.currentUserSubject.next(mappedUser);
            this.isLoggedInSubject.next(true);

            return {
              user: mappedUser,
              token: token,
              message: 'Login exitoso'
            } as AuthResponse;
          } else {
            throw new Error('Credenciales inválidas');
          }
        }),
        catchError(this.handleError)
      );
  }

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    // First check if user already exists
    return this.http.get<any[]>(`${this.API_URL}/usuarios/`)
      .pipe(
        map(usuarios => {
          // Check if email already exists
          const existingUser = usuarios.find(u => u.email === registerData.email);
          if (existingUser) {
            throw new Error('El email ya está registrado');
          }
          return usuarios;
        }),
        // Then create the new user
        map(() => {
          const newUser = {
            nombre: registerData.username,
            email: registerData.email,
            contrasena: registerData.password, // In production, hash this password
            fechaRegistro: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
          };

          return this.http.post<any>(`${this.API_URL}/usuarios/`, newUser);
        }),
        // Flatten the observable
        map(createUserObservable => createUserObservable),
        // Handle the response
        map((response: any) => {
          const token = btoa(`${response.email}:${Date.now()}`);
          const mappedUser: User = {
            id: response.idusuarios,
            username: response.nombre,
            email: response.email,
            createdAt: new Date(response.fechaRegistro)
          };

          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(mappedUser));
          this.currentUserSubject.next(mappedUser);
          this.isLoggedInSubject.next(true);

          return {
            user: mappedUser,
            token: token,
            message: 'Registro exitoso'
          } as AuthResponse;
        }),
        catchError(this.handleError)
      );
  }

  // Remove the complex register method and fix registerUser
  registerUser(registerData: RegisterRequest): Observable<AuthResponse> {
    // First check if email already exists
    return this.http.get<any[]>(`${this.API_URL}/usuarios/`).pipe(
      map(usuarios => {
        const existingUser = usuarios.find(u => u.email === registerData.email);
        if (existingUser) {
          throw new Error('El email ya está registrado');
        }
        return true;
      }),
      // Then create the user
      switchMap(() => {
        const newUser = {
          nombre: registerData.username,
          email: registerData.email,
          contrasena: registerData.password,
          fechaRegistro: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          idusuarios: null // Explicitly set as null since it's auto-generated
        };
        
        console.log('Sending user data to backend:', newUser);
        
        return this.http.post<any>(`${this.API_URL}/usuarios/`, newUser);
      }),
      map(response => {
        console.log('Backend response:', response);
        
        const token = btoa(`${response.email}:${Date.now()}`);
        const mappedUser: User = {
          id: response.idusuarios,
          username: response.nombre,
          email: response.email,
          createdAt: new Date(response.fechaRegistro)
        };

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(mappedUser));
        this.currentUserSubject.next(mappedUser);
        this.isLoggedInSubject.next(true);

        return {
          user: mappedUser,
          token: token,
          message: 'Registro exitoso'
        } as AuthResponse;
      }),
      catchError(this.handleError)
    );
  }

  resetPassword(resetData: ResetPasswordRequest): Observable<ApiResponse> {
    // Since your backend doesn't have reset password endpoint,
    // we'll simulate it for now
    return new Observable(observer => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, you would send email here
        observer.next({
          success: true,
          message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.',
          data: null
        });
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';

    console.error('Full error object:', error);
    console.error('Error status:', error.status);
    console.error('Error body:', error.error);

    if (error.error?.detail) {
      // FastAPI validation errors
      if (Array.isArray(error.error.detail)) {
        const fieldErrors = error.error.detail.map((e: any) => {
          if (e.loc) {
            return `${e.loc.join('.')}: ${e.msg}`;
          }
          return e.msg;
        }).join(', ');
        errorMessage = `Errores de validación: ${fieldErrors}`;
      } else {
        errorMessage = error.error.detail;
      }
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.status === 0) {
      errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.';
    } else if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 422) {
      errorMessage = 'Datos de registro inválidos. Verifica que todos los campos estén completos y sean válidos.';
    } else if (error.status === 409) {
      errorMessage = 'El usuario ya existe';
    } else if (error.status >= 500) {
      errorMessage = 'Error del servidor. Intenta más tarde';
    }

    return throwError(() => new Error(errorMessage));
  }
}
