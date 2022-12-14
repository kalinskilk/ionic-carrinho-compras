import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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
  public descriptionBuy = '';
  public idCompra: number;
  constructor(
    private fb: FormBuilder,
    public alertService: AlertService,
    private http: NewBuyService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.validators();
  }

  ionViewWillEnter(): void {
    this.idCompra = Number(this.activedRoute.snapshot.params.id);
    const descBuy = this.activedRoute.snapshot.params.descBuy;
    this.descriptionBuy = descBuy.trim() ? descBuy : '';
    if (this.idCompra) {
      this.getList();
    }
    this.initForm();
  }

  initForm(): void {
    this.listProdutos = [];
    this.model = new NewBuyModel();
    this.formGroup = this.fb.group(this.model);
    this.indexEditing = null;
    this.validators();
  }

  async getList(): Promise<void> {
    this.listProdutos = await this.http.all(this.idCompra);
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
    this.formGroup.controls.id.setValue(produto.id);
  }

  async onDelete(index: number): Promise<void> {
    const params = {
      header: 'Deseja deletar este item?',
      subHeader: ' ',
    };
    const isConfirm = await this.alertService.presentActionSheet(params);
    if (isConfirm) {
      const hasId = this.listProdutos[index].id;
      if (hasId) {
        await this.http.deleteItenCompra(hasId);
      }
      this.listProdutos.splice(index, 1);
      this.formGroup.reset();
      await this.alertService.presentToast('Excluido com sucesso!');
    }
  }

  validators(): void {
    this.formGroup.controls.produto.setValidators(Validators.required);
  }

  async onSalvar(): Promise<void> {
    if (!this.descriptionBuy) {
      const msg = `Descrição da Compra não informada.`;
      this.alertService.presentToast(msg, 1500, 'danger');
      return;
    }
    if (!this.listProdutos.length) {
      const msg = `Nenhum produto informado, a lista não pode ser salva!`;
      this.alertService.presentToast(msg, 1500, 'danger');
      return;
    }
    await this.http.saveCompra(
      this.descriptionBuy,
      this.listProdutos,
      this.idCompra
    );
    this.router.navigate(['/tabs/tab2']);
  }
}
