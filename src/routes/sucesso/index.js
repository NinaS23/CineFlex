import {useLocation, Link} from 'react-router-dom';

import "./style.css";

export default function Sucesso() {
    const {state} = useLocation();
  
    return (

        <div className="afastar">
            <div className="sub-titulo">
                <h2 className="verde ">Pedido feito com sucesso!</h2>
            </div>
            <div className="finalizar">
                <div className="fime-sessao">
                    <h1 className="letra-bonita">Filme e sessão</h1>
                    <div className=" info-final">
                        <h2>{state.movie} </h2>
                        <h2>{state.date} - {state.time}</h2>
                    </div>
                </div>
                <div className="ingresso">
                    <div className="fime-sessao">
                        <h1 className="letra-bonita">Ingressos</h1>
                        <div className=" info-final">
                         <h2> Assento 12</h2>
                         <h2> Assento 34</h2>
                        </div>
                    </div>
                </div>
                <div className="comprador-ingresso">
                    <div className="fime-sessao">
                        <h1 className="letra-bonita">Comprador</h1>
                        <div className=" info-final">
                            <h2>{state.name}</h2>
                            <h2>{state.cpf}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <Link to={'/'}>
            <div className='centralizar'>
                        <div  className='clicar central empurrar'><h2>Voltar pra Home</h2></div>
                    </div>
                </Link>
               
        </div>
    )
}