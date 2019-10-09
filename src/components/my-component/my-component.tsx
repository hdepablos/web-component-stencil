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

  @State() promociones: IPromociones[] = [];
  
  @State() bancos: IBancos[] = [];
  
  @State() servicios: any [] = [];

  @State() promocionesAll: any [] = [];

  @State() disabled: boolean = false;

  /**
   * The middle name
   */
  async getPromociones(): Promise<IPromociones[]>{
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

  getItemsServicios(rowP){
    const rowPServicios = this.getUnicos(rowP,'tipo_serv_id').map( item => {
      const { tipo_serv_id, tipo_serv_nombre, alta, vencimiento, nota_legal } = item;
      return { tipo_serv_id, tipo_serv_nombre, nota_legal,
        alta: alta.replace(/(\d+)\D+(\d+)\D+(\d+)/g, "$3-$2-$1"), 
        vencimiento: vencimiento.replace(/(\d+)\D+(\d+)\D+(\d+)/g, "$3-$2-$1"), 
        row: this.getItemsTarjeta(rowP)
      };
    });
    return rowPServicios;
  }
  
  getItemsTarjeta(rowTarjeta){
    const rowAllTarjetas = this.getUnicos(rowTarjeta,'card_id').map( item => {
      const { card_id, card_nombre, img_card} = item;

      return { card_id, card_nombre, img_card,
        row: rowTarjeta.filter(e => e.card_id == card_id).map( i => {
          const { cta_cuotas} = i;
          
          return { cta_cuotas,
            cta_interes: this.MontoEs(i.cta_interes),
            cftna: this.MontoEs(i.cftna)
          };
        })
      };
    });
    return rowAllTarjetas;
  }

  async clickbanco(idBanco){
    let rowBancoSel: any = await this.bancos.filter( item => item.bco_id == idBanco)[0].bco_row;
    
    const promociones = this.getUnicos(rowBancoSel,'promocion_id').map( item => {
      const { promocion_id } = item;
      return { promocion_id,
        row: rowBancoSel.filter(e => e.promocion_id == promocion_id)
      };
    });

    const serviciosNew = promociones.map(e => {
      const { promocion_id } = e;
      return { promocion_id, 
        row: this.getItemsServicios(e.row)
      };
    });

    this.promocionesAll = serviciosNew;

    const selectedAll = this.el.shadowRoot.querySelectorAll('.cls-bancos');
    await selectedAll.forEach(function(item) {
      item.classList.remove("selected");
      if(item.classList.contains(`item-${idBanco}`)){
        item.classList.add("selected");
      }
    });

    // verificar si existe
    // const detalle = this.el.shadowRoot.getElementById('body-promo');

    const pruebaElement = this.el.shadowRoot.querySelector(".lis-bancos .body-promo");

    // Eliminar el elemento y si es el mismo lo cierra
    if (pruebaElement) {
      // console.log("Elemento seleccionado");
      // console.log(pruebaElement);
      pruebaElement.remove();

      
      // console.log('Deberia de elimiar');
      
      // const valAttribute = detalle.getAttribute("bancoid");
      // console.log("El atributo es: ");

      
      // console.log(valAttribute);
      
      // // detalle.remove();
      // if (valAttribute == idBanco) return;
    }


    // // var x = document.getElementById("myAnchor").getAttribute("target");
    // const valAttribute = 
    // console.log('detalle');
    // console.log(detalle);

    // const atributo = detalle.getAttribute('bancoid');
    
    // if(atributo){
    //   console.log('si existe, es el mismo');
    // }else{
    //   console.log('no es otro');
    // }
   

    // const idSeleccionado = document.getElementById(`id-${idBanco}`);
    // const idSeleccionado : string = `id-${idBanco}`;
    // const element = document.getElementById(`id-${idBanco}`);
    // const el: HTMLElement = document.getElementById(`id-${idBanco}`);

    const ancho = screen.width;
    // console.log("el tamaño es: ", ancho);
    // console.log(idBanco);

    if (ancho <= 767){
      this.active = false;
      // const gralPromo = this.el.shadowRoot.querySelector("gral-promo");
      // gralPromo.style.visibility = 'hidden';

      // document.querySelectorAll("div#tabs" + tabId + "> div.page")[0].style.display = 'none'; 
      // const gralPromo = this.el.shadowRoot.querySelectorAll('.gral-promo')
      // gralPromo.forEach(function(item) {
      //   item.
      // });

      // var formElement = this.el.shadowRoot.getElementById('gral-promo');
      // formElement.style.display='block';

      // const divPrueba = this.el.shadowRoot.querySelector('#gral-promo');
      // const shadowRoot = div.attachShadow ({mode : 'open'});
      // const shadowRoot = div.attachShadow();
      // console.assert (shadowRoot.parentElement === null);
      // console.assert (shadowRoot.parentNode === null);
      // shadowRoot.host.parentElement.style.backgroundColor = 'red';


      // divPrueba.host.parentElement.style.visibility = 'none';

      // divPrueba.shadowRoot.host.parentElement.style.visibility = 'none';




      // const liElems = this.el.shadowRoot.querySelectorAll('.gral-promo');
      // liElems.forEach(element => {
      //   let s = window.getComputedStyle(element);
      //   s.display = 'none';
      // });

      // const filtered = [].filter.call(liElems, function(el) {
      //   let style = window.getComputedStyle(el);
      //   return (style.display !== 'none')
      // });

      // console.log('Prueba');
      // console.log(filtered);
      
      
      
      // console.log("Es pequeña la pantalla debemos insertar debajo del item seleccionado");
      // console.log("El id seleccionado es: ");
      // console.log(el);
      // const d1 = document.getElementById(`id-${idBanco}`);
      // const d1 = document.getElementById('id-17');
      // console.log(d1);
      
      // d1.insertAdjacentHTML('beforeend', '<div id="two">two</div>');
      // insertBefore
      // el.insertBefore()

      // const newNode = document.createElement("span");

      // const x = document.getElementById(`id-${idBanco}`).parentElement.nodeName;

      // console.log(el.ELEMENT_NODE);
      // document.getElementById("demo").innerHTML = x;

      // const newDetalle = `
      //   <ion-thumbnail slot="start">
      //       <h2>prueba debajo</h2>    
      //   </ion-thumbnail>
      //   <ion-label>
      //     <h2>prueba debajo</h2>
      //   </ion-label>`;

      //newDetalleClon.id = 'sdf';

      // const test3 = document.querySelector("#test1").cloneNode(true);
      // test3.setAttribute("id", "test3");
      // test3.querySelector("#test2").setAttribute("id", "test4");
      // console.log(test3);

      // var clone = this.el.shadowRoot.getElementById('test').cloneNode(true);
      // clone.querySelector('.child').innerHTML = "TEST 2"
      // clone.setAttribute('id', 123)
      // document.body.appendChild(clone)

      // var test3 = document.querySelector("#test1").cloneNode(true);
      // test3.setAttribute("id", "test3");
      // test3.querySelector("#test2").setAttribute("id", "test4");
      // console.log(test3);

      // newDetalleClon
        // newDetalleClon.querySelectorAll('[id="test0"]')[0].id = "new-id";

        // tableRow.parentNode.insertBefore(tableRowClone, tableRow.nextSibling);

      // // Caso 1 Funciona
      const bodyPromoOriginal = this.el.shadowRoot.getElementById("body-promo");
      const newDetalleClon = bodyPromoOriginal.cloneNode(true);
      const sp2 = this.el.shadowRoot.getElementById(`id-${idBanco}`);
      // sp2.appendChild(newDetalleClon);
      this.insertAfter(newDetalleClon, sp2);




      // Caso 2 funciona
      // var newNode = document.createElement(`ion-item`);
      // newNode.setAttribute('id', 'ver-promo');
      // newNode.setAttribute('bancoid', `${idBanco}`);
      // const sp2 = this.el.shadowRoot.getElementById(`id-${idBanco}`);
      // sp2.appendChild(newDetalleClon);
      // this.insertAfter(newNode , sp2);
      
      // const parentDiv = sp2.parentNode;
      // parentDiv.appendChild(newNode);
      // parentDiv.insertBefore( newNode, sp2);
      // this.insertAfter(newNode, sp2);
      // detalle.innerHTML(newDetalle);
      // const newdetalle = this.el.shadowRoot.getElementById('detalle-promo');
      // newdetalle.innerHTML = newDetalle;
    }else{
      this.active = true;
    }
  }

  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  getUnicos(arr, key) {
    let lookup = new Set();
    return arr.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  async cargarPromociones(){
    const rowAll = await this.getPromociones();
    this.bancos = this.getUnicos(rowAll,'bco_id').map( item => {
      const { bco_id, bco_nombre, bco_img } = item;
      return { bco_id, bco_nombre, bco_img, bco_row: rowAll.filter(item => item.bco_id == bco_id)};
    })
  }

  async componentWillLoad() {
    await this.cargarPromociones();
    this.clickbanco(this.bancos[0].bco_id);
  }

  componentDidLoad(){
    const idBanco = this.bancos[0].bco_id;
    const selectedAll = this.el.shadowRoot.querySelectorAll('.cls-bancos');
    selectedAll.forEach(function(item) {
      if(item.classList.contains(`item-${idBanco}`)){
        item.classList.add("selected");
      }
    });
  }

  render() {
    return (
      <div>
        {/* <ion-app>
          <ion-content class="ion-padding"> */}
            <ion-grid>
              <ion-row>
                <ion-col size-xs="12" size-md="4" size-lg="3" class="lis-bancos">
                  <ion-list-header>
                    <ion-title>Entidades financieras</ion-title>
                  </ion-list-header>
                  
                  {this.bancos.map(item => (
                    <ion-item id={`id-${ item.bco_id }`} class={`cls-bancos item-${ item.bco_id }`} onClick={() => this.clickbanco(item.bco_id)}>
                      <ion-thumbnail slot="start">
                          <img class="fil-bancos" src={item.bco_img}></img>
                      </ion-thumbnail>
                      <ion-label>
                        <h2>{item.bco_nombre} </h2>
                      </ion-label>
                    </ion-item>
                  ))}
                </ion-col >
                  

                  {/* class={(this.active ? 'ver ' : 'ver-oculto ')} */}
                  {/* class="gral-promo" */}
                  <ion-col class={(this.active ? 'ver ' : 'ver-oculto ')} size-xs="12" size-md="8" size-lg="9">
                      {this.promocionesAll.map(item => (
                        <section>
                          {
                            item.row.map(y => (
                              <div id="body-promo" class="body-promo list card">
                                <br/>
                                <div class="item item-divider">
                                  <h2>Promociones que aplica a { y.tipo_serv_nombre }</h2>
                                  {/* <h1>Promociones que aplica a { item.tipo_serv_nombre }</h1> */}
                                </div>

                                {
                                  y.row.map( e => (
                                    <div>
                                      <ion-item>
                                        <ion-thumbnail slot="start">
                                            <img class="fil-bancos" src={e.img_card}></img>
                                        </ion-thumbnail>
                                        <ion-label>
                                          
                                          <p>Aplica solo para las tarjetas {e.card_nombre}</p>
                                          <p>{y.alta} / {y.vencimiento}</p>  
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
                                      <br/>
                                    </div>
                                  ))
                                }

                                <div class="item item-body nota-legal">
                                  <p>{y.nota_legal}
                                  </p>
                                </div>
                                <hr class="sep-tip-servicio"/>

                              </div> 
                            ))
                          }
                        </section>
                      ))}
                  </ion-col>
              </ion-row>
            </ion-grid>
          {/* </ion-content>
        </ion-app> */}
    </div>);
  }
}