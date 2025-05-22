import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestao-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './gestao-usuarios.component.html',
  styleUrl: './gestao-usuarios.component.css'
})
export class GestaoUsuariosComponent implements OnInit {
  errorMessage: string | null = null;
  usuarioForm: FormGroup;
  usuarios: Usuario[] = [];
  modoEdicao: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {
    this.usuarioForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
      somenteConsulta: [false]
    });
  }

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios(): void {
    this.usuariosService.getAllUsuarios().subscribe({
      next: (res: Usuario[]) => {
        this.usuarios = res;
        this.errorMessage = null;
      },
      error: () => {
        this.usuarios = [];
        this.errorMessage = 'Erro ao buscar os usuários';
      }
    });
  }

  adicionarUsuario(): void {
    if (this.usuarioForm.invalid) return;

    const novoUsuario: Usuario = this.usuarioForm.value;

    this.usuariosService.addUsuario(novoUsuario).subscribe({
      next: () => {
        this.getAllUsuarios();
        this.usuarioForm.reset({ somenteConsulta: false });
      },
      error: () => {
        this.errorMessage = 'Erro ao adicionar usuário';
      }
    });
  }

  editarUsuario(): void {
    if (this.usuarioForm.invalid) return;

    const usuarioAtualizado: Usuario = this.usuarioForm.value;

    this.usuariosService.updateUsuario(usuarioAtualizado).subscribe({
      next: () => {
        this.getAllUsuarios();
        this.usuarioForm.reset({ somenteConsulta: false });
        this.modoEdicao = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao atualizar usuário';
      }
    });
  }

  removerUsuario(login: string): void {
    this.usuariosService.deleteUsuario(login).subscribe({
      next: () => this.getAllUsuarios(),
      error: () => {
        this.errorMessage = 'Erro ao remover usuário';
      }
    });
  }

  carregarUsuarioParaEdicao(usuario: Usuario): void {
    this.usuarioForm.patchValue({
      login: usuario.login,
      senha: usuario.senha,
      somenteConsulta: !!usuario.somenteConsulta
    });
    this.modoEdicao = true;
  }

  cancelarEdicao(): void {
    this.usuarioForm.reset({ somenteConsulta: false });
    this.modoEdicao = false;
  }

  onSubmit(): void {
  if (this.modoEdicao) {
    this.editarUsuario();
  } else {
    this.adicionarUsuario();
  }
}

atualizarSomenteConsulta(usuario: Usuario): void {
  const usuarioAtualizado: Usuario = { ...usuario };

  console.log('USUARIO ', usuarioAtualizado)
  this.usuariosService.updateUsuario(usuarioAtualizado).subscribe({
    next: () => {
      this.getAllUsuarios();
    },
    error: () => {
      this.errorMessage = 'Erro ao atualizar permissão de consulta';
    }
  });
}

}
