import { Component, h, State, Element } from '@stencil/core';
import '@ionic/core';

interface IPromociones {

  bco_id: number;
  bco_nombre: string;
  bco_img: string;

  tipo_serv_id: number;
  tipo_serv_nombre: string;

  card_id: number;
  card_nombre: string;
  img_card: string;
  cta_cuotas: number;
  cta_interes: number;
  cftna: number;

  alta: Date;
  vencimiento: Date;
  nota_legal: string;
};

interface IBancos {
  bco_img: string;
  bco_nombre: string;
  bco_id: number;
  bco_row: [];
};

@Component({
  tag: 'allseasons-promociones',
  styleUrl: 'my-component.css',
  shadow: true
})

export class MyComponent {
  /**
   * The first name
   */

  @Element() el: HTMLElement;
  @State() active: boolean = true;
  @State() idBanco: boolean = true;
  @State() promociones: IPromociones[] = [];
  @State() bancos: IBancos[] = [];
  @State() promocionesAll: any[] = [];

  async getPromociones(): Promise<IPromociones[]> {
    try {
      const response = await fetch("https://asback.allseasons.tur.ar/api/prueba");
      const json = await response.json();
      return json.original;
    } catch (error) {
      // console.log(error);
    }
  }

  MontoEs(value: number): string {
    const val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  getItemsServicios(rowP) {
    const rowPServicios = this.getUnicos(rowP, 'tipo_serv_id').map(item => {
      const { tipo_serv_id, tipo_serv_nombre, alta, vencimiento, nota_legal } = item;
      return {
        tipo_serv_id, tipo_serv_nombre, nota_legal,
        alta: alta.replace(/(\d+)\D+(\d+)\D+(\d+)/g, "$3-$2-$1"),
        vencimiento: vencimiento.replace(/(\d+)\D+(\d+)\D+(\d+)/g, "$3-$2-$1"),
        row: this.getItemsTarjeta(rowP)
      };
    });
    return rowPServicios;
  }

  getItemsTarjeta(rowTarjeta) {
    const rowAllTarjetas = this.getUnicos(rowTarjeta, 'card_id').map(item => {
      const { card_id, card_nombre, img_card } = item;

      return {
        card_id, card_nombre, img_card,
        row: rowTarjeta.filter(e => e.card_id == card_id).map(i => {
          const { cta_cuotas } = i;

          return {
            cta_cuotas,
            cta_interes: this.MontoEs(i.cta_interes),
            cftna: this.MontoEs(i.cftna)
          };
        })
      };
    });
    return rowAllTarjetas;
  }

  async clickbanco(idBanco) {
    this.idBanco = idBanco;
    let rowBancoSel: any = await this.bancos.filter(item => item.bco_id == idBanco)[0].bco_row;

    const promociones = this.getUnicos(rowBancoSel, 'promocion_id').map(item => {
      const { promocion_id } = item;
      return {
        promocion_id,
        row: rowBancoSel.filter(e => e.promocion_id == promocion_id)
      };
    });

    const serviciosNew = promociones.map(e => {
      const { promocion_id } = e;
      return {
        promocion_id,
        row: this.getItemsServicios(e.row)
      };
    });

    this.promocionesAll = serviciosNew;

    const selectedAll = this.el.shadowRoot.querySelectorAll('.cls-bancos');
    await selectedAll.forEach(function (item) {
      item.classList.remove("selected");
      if (item.classList.contains(`item-${idBanco}`)) {
        item.classList.add("selected");
      }
    });
    this.active = (screen.width <= 767) ? false : true;
  }

  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  // asldfkjalskdjflkajsdf
  getUnicos(arr, key) {
    let lookup = new Set();
    return arr.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  async cargarPromociones() {
    const rowAll = await this.getPromociones();
    this.bancos = this.getUnicos(rowAll, 'bco_id').map(item => {
      const { bco_id, bco_nombre, bco_img } = item;
      return { bco_id, bco_nombre, bco_img, bco_row: rowAll.filter(item => item.bco_id == bco_id) };
    })
  }

  async componentWillLoad() {
    await this.cargarPromociones();
    this.clickbanco(this.bancos[0].bco_id);
  }

  componentDidLoad() {
    const idBanco = this.bancos[0].bco_id;
    const selectedAll = this.el.shadowRoot.querySelectorAll('.cls-bancos');
    selectedAll.forEach(function (item) {
      if (item.classList.contains(`item-${idBanco}`)) {
        item.classList.add("selected");
      }
    });
  }

  componentDidRender() {
    // veriifcar si se esta visualizando en el cel de la contrario se sale de la function
    if (!(screen.width <= 767)) return;

    // verificar si existe
    const pruebaElement = this.el.shadowRoot.querySelector(".lis-bancos .body-promo");

    // Varificar si existe el elemento
    if (pruebaElement) {
      // Por default elimina el element
      pruebaElement.remove();

      // Verificar si el que está es el mismo banco
      const classContain = pruebaElement.classList.contains(`item-${this.idBanco}`);
      // Si es el mismo, se sale de la function.
      if(classContain) return;
    }

    // Pintar el nuevo elemento seleccionado
    const bodyPromoOriginal = this.el.shadowRoot.getElementById("body-promo");
    const newDetalleClon = bodyPromoOriginal.cloneNode(true);
    const sp2 = this.el.shadowRoot.getElementById(`id-${this.idBanco}`);
    this.insertAfter(newDetalleClon, sp2);
  }

  render() {
    return (
      <div>
        <ion-grid>
          <ion-row>
            <ion-col size-xs="12" size-md="4" size-lg="3" class="lis-bancos">
              <ion-list-header>
                <ion-title>Entidades financieras</ion-title>
              </ion-list-header>

              {this.bancos.map(item => (
                <ion-item id={`id-${item.bco_id}`} class={`pointer cls-bancos item-${item.bco_id}`} onClick={() => this.clickbanco(item.bco_id)}>
                  <ion-thumbnail slot="start">
                    <img class="fil-bancos" src={item.bco_img}></img>
                  </ion-thumbnail>
                  <ion-label>
                    <h2>{item.bco_nombre} </h2>
                  </ion-label>
                </ion-item>
              ))}
            </ion-col>

            <ion-col class={`${(this.active ? 'ver ' : 'ver-oculto ')}`} size-xs="12" size-md="8" size-lg="9">
              <div id="body-promo" class={`item-${this.idBanco} body-promo`}>
                {this.promocionesAll.map(item => (
                  <section>
                    {
                      item.row.map(y => (
                        <div class={`list card`}>
                          <br />
                          <div class="item item-divider">
                            <h2>Promociones que aplica a {y.tipo_serv_nombre}</h2>
                          </div>

                          {
                            y.row.map(e => (
                              <div>
                                <ion-item>
                                  <ion-thumbnail slot="start">
                                    <img class="fil-bancos" src={e.img_card}></img>
                                  </ion-thumbnail>

                                  <ion-label>
                                    <p>Aplica solo para las tarjetas {e.card_nombre}</p>
                                    <p>Vigente hasta {y.vencimiento}</p>
                                  </ion-label>
                                </ion-item>

                                <section>
                                  <table class="features-table">
                                    <thead>
                                      <tr>
                                        <td>Cuotas</td>
                                        <td>Interes %</td>
                                        <td>CFTNA</td>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {
                                        e.row.map(t => (
                                          <tr>
                                            <td class="detalle">{t.cta_cuotas}</td>
                                            <td class="detalle">{t.cta_interes}</td>
                                            <td class="detalle">{t.cftna}</td>
                                          </tr>
                                        ))
                                      }
                                    </tbody>
                                  </table>
                                </section>
                                <br />
                              </div>
                            ))
                          }

                          <div class="item item-body nota-legal">
                            <p>{y.nota_legal}
                            </p>
                          </div>
                          <hr class="sep-tip-servicio" />

                        </div>
                      ))
                    }
                  </section>
                ))}
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    );
  }
}
