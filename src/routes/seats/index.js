
import { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import "./style.css";


export default function Seats() {
    const { idSessao } = useParams();
    console.log("idSessao", idSessao)
    const [seats, setSeats] = useState([])
    const [name , setName] = useState("")
    const [CPF, setCPF] = useState("")
    const [ select , setSelect] = useState=(false)
    useEffect(() => {

        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        requisicao.then(resposta => {
            console.log(resposta.data.seats)
            setSeats(resposta.data.seats)


        });
        requisicao.catch(err => console.log(err.resposta))

    }, []);
    console.log(seats)
    let assento = seats.map(seat => {
        return {
            ...seat,
            tap: false,
            selected : false

        }
    })

    console.log(assento)
    function tapSeat(indexSeat) {
        let SeatsNew = assento.map((value, index) => {
            if (index === parseInt(indexSeat) - 1) {
                return {
                    ...value,
                    isAvailable: true, 
                    
                }
            } else {
                return {
                    ...value,

                }
            }
        })

        setSeats([...SeatsNew])
    }
  
console.log(name)
console.log(CPF)
function Sucesso(){
    useNavigate("/sucesso", {
        state: {
            assentos: seats.numeros,
            comprador: { nome: name, cpf: CPF }
        }
    })
}

    return (
        <>
            <main>
                <div>
                    <h2 className="afastar">selecione os assentos</h2>
                </div>
                <div className="assentos">

                    {seats.map((e, index) => {
                        return (
                            (e.isAvailable === true) ?
                                <p onClick={() => tapSeat(e.name)} key={index} className="selected">{e.name}</p>
                                :
                                <p onClick={() => tapSeat(e.name)} key={index} className="botao">{e.name}</p>
                        )
                    })}

                    <div className="selecao" >

                        <div className="alinhar">
                            <div className="bolinha-azul"></div>
                            <h3>selecionado</h3>
                        </div>

                        <div className="alinhar">
                            <div className="bolinha-cinza"></div>
                            <h3>Disponível</h3>
                        </div>
                        <div className="alinhar">
                            <div className="bolinha-amarela"></div>
                            <h3>Indisponível</h3>
                        </div>
                    </div>
                    <div className="inputs">
                        <div>
                            <h2>Nome do comprador:</h2>
                            <input  className="nome" type="text" name="name" onChange={(e) => setName(e.target.value) } placeholder="Digite seu nome..." />
                        </div>
                        <div>
                            <h2>Nome do comprador:</h2>
                            <input className="nome" type="text" name="name"   onChange={(e) => setCPF(e.target.value) } placeholder="Digite seu CPF..." />
                        </div>
                        <button>
                            <h2 onClick={Sucesso}>Reservar assento(s)</h2>
                        </button>
                    </div>
                </div>

            </main>

        </>
    )
}