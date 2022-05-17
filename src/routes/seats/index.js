import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./style.css";


export default function Seats(){
    const { idSessao } = useParams();
    console.log("idSessao" , idSessao)
    const [seats, setSeats] = useState([])
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
            
        }
    })

    console.log(assento)
    function tapSeat (idSeat) {
        let SeatsNew = assento.map((value, index) => {
            if (index === idSeat) {
                return {
                    ...value,
                    tap: true,
                }
            } else {
                return {
                    ...value,
                    tap: false,
                }
            }
        })

      setSeats([...SeatsNew])
    }

   
    return(
        <>
        <div>
            <h2>selecione os assentos</h2>
        </div>
        <div   className="assentos">
            
                {assento.map((e , index) => {
                    return (
                        <p onClick={tapSeat} className="botao">{e.name}</p>
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
            </div>
       
        </>
    )
}