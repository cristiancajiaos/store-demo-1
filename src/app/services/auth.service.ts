import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { ToastrService } from 'ngx-toastr';

import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private toastrService: ToastrService
  ) { }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.toastrService.success("Logueado");
      return result;
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found': {
          this.toastrService.error('La cuenta con la que se trató de ingresar, no existe', 'Usuario inexistente');
          break;
        }

        case 'auth/wrong-password': {
          this.toastrService.error('La contraseña ingresada no corresponde a la de la cuenta ingresada', 'Contraseña incorrecta');
          break;
        }

        default: {
          this.toastrService.error('Hubo un error desconocido', 'Error');
          break;
        }
      }
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.log(error);
      this.toastrService.error(error, 'Error');
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
      this.toastrService.success('Te has deslogueado exitosamente', 'Deslogueado');
    } catch (error) {
      this.toastrService.error(error, 'Error');
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.auth.currentUser).sendEmailVerification();
  }

  async resetPassword(email: string) {
    try {
      return this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      this.toastrService.error(error, 'Error');
    }
  }

  async loginGoogle() {
    try {
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      this.toastrService.error(error, 'Error');
    }
  }
}
