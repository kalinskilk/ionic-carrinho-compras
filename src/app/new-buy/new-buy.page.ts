import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { SqlLiteService } from '../services/sql/sql-lite.service';
import { NewBuyModel } from './new-buy-model';
import { NewBuyService } from './new-buy.service';

@Component({
  selector: 'app-new-buy',
  templateUrl: './new-buy.page.html',
  styleUrls: ['./new-buy.page.scss'],
})
export class NewBuyPage implements OnInit {
  public formGroup: FormGroup;
  public model: NewBuyModel;
  public listProdutos: NewBuyModel[] = [];
  public indexEditing: number;
  constructor(
    private fb: FormBuilder,
    public alertService: AlertService,
    private http: NewBuyService,
    private router: Router
  ) {
    this.model = new NewBuyModel();
    this.formGroup = this.fb.group(this.model);
  }

  ngOnInit() {
    this.validators();
  }

  addProduto(): void {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.indexEditing === 0 || this.indexEditing) {
      this.listProdutos[this.indexEditing] = this.formGroup.value;
    } else {
      this.listProdutos.push(this.formGroup.value);
    }
    this.indexEditing = null;
    this.formGroup.reset();
    this.validators();
  }

  onEdit(index: number): void {
    const produto = this.listProdutos[index];
    this.indexEditing = index;
    this.formGroup.controls.produto.setValue(produto.produto);
    this.formGroup.controls.valor.setValue(produto.valor);
  }

  async onDelete(index: number): Promise<void> {
    const del = await this.alertService.presentAlertConfirm(
      'Atenção',
      'Deseja deletar o produto?'
    );
    if (del) {
      this.listProdutos.splice(index, 1);
      this.formGroup.reset();
      await this.alertService.presentToast('Excluido com sucesso!');
    }
  }

  validators(): void {
    this.formGroup.controls.produto.setValidators(Validators.required);
  }

  async onSalvar(): Promise<void> {
    if (!this.listProdutos.length) {
      const msg = `Nenhum produto informado a lista não pode ser salva!`;
      this.alertService.presentToast(msg, 1500, 'danger');
      return;
    }
    await this.http.saveCompra(this.listProdutos);
    this.router.navigate(['/tab2']);
  }
}
