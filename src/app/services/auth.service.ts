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
      this.toastrService.error(error, 'Error');
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.toastrService.success('Ya puedes loguearte con tu usuario y contraseña', 'Registro completado');
      return result;
    } catch (error) {
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
}
