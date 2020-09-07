import React, {useState, useEffect} from 'react';
import firebase from '../../utils/firebaseUtils.js'
import { PieChart } from 'react-minimal-pie-chart';
import * as data from './contablack-9-export.json';
import Header from "../../components/header/header.js";
import image1 from '../../img/icons/cartao-de-credito.png';
import image2 from '../../img/icons/aumento.png';
import image3 from '../../img/icons/dinheiro.png';
import image4 from '../../img/icons/info.png';
import image5 from '../../img/icons/checkbox.png';


function Evolucao() {
  const [active, setActive] = useState(true)
  // const [bdMock,setBdMock] = useState();

  const bdMock = [
    { title: 'Pagamento de Contas', value: data[0].bill, color: '#E38627' },
    { title: 'Depósitos', value: data[0].deposit, color: '#C13C37' },
    { title: 'Pagamento Fatura Black', value: data[0].creditCard, color: '#6A2135' },
    { title: 'Transferência', value: data[0].tranfer, color: '#A72445' },
    { title: 'Pagamento Empréstimo', value: data[0].loan, color: '#6E6135' },
  ];
  
  const defaultLabelStyle = {
    fontSize: '10px',
    fontFamily: 'sans-serif',
  };
  const saldo = () => {
     let soma = 0;
     bdMock.forEach(data => (
      soma = soma + data.value
     ))
     return soma
  }

  return(
  <section>
    <Header/>
    <h1>Minha Análise de Crédito</h1>
    <div className="tabMenu">
      <button className={active ? "activeTab" : "tab"} onClick={()=> setActive(active => true)}>Meu BlackScore</button>
      <button className={!active ? "activeTab" : "tab"} onClick={()=>setActive(active => false)}>Resgate</button>
    </div> 
    {active ? 
    <div className="container"> 
      <div className="graph-area">
      <PieChart
        data= {bdMock}
        lengthAngle={-360} animate
        style={{ height: '150px', width: '50%' }}
        lineWidth={55}

        />
        {/* label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          ...defaultLabelStyle,
        }}
        labelPosition={70} */}
        <aside className="label">
        {bdMock.map(data => ( 
          <div key={data.color}>
            <span className="valor">{data.value}</span> {data.title}
          </div>
        ))}
        </aside>
        </div>
       <h2>Total: {saldo()}</h2>
       <button className="btn-ev" onClick={() => window.location="/objetivos"}><img height="30px" width="30px" src={image5}/> Meus Objetivos</button>
       <button className="btn-ev"><img height="30px" width="30px" src={image4}/>Mais Informações</button>

    </div>
    :
    <div className="regate">
      <h3>Saldo de pontos</h3>
      <p className="saldo">{saldo()}</p>
      {saldo() >=500 ? 
      <p>Seu crédito pré-aprovado é de <b>R$ {saldo()*4},00</b></p>
      :
      <p>Você ainda não tem crédito pré-aprovado</p>
      }
      <button className='btn-resgate'><img height="30px" width="30px" src={image3}/>Solicitar Crédito em Conta</button>
      <button className='btn-resgate'><img height="30px" width="30px" src={image1}/>Solicitar Cartão de Crédito </button>
      <button className='btn-resgate'><img height="30px" width="30px" src={image2}/>Solicitar Aumento de Limite</button>
    </div>
    }
  
  </section>

  )
}


export default Evolucao;