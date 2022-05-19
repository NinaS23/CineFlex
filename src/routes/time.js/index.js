import "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Time() {
    const { idFilme } = useParams();
    console.log("filme id: " + idFilme);
    const [day, setDay] = useState([])
    const [filme, setFilme] = useState([])
    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

        requisicao.then(resposta => {
            setDay(resposta.data.days);
        });
        requisicao.catch(err => console.log(err.resposta))


    }, [])
    console.log(day)
    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

        requisicao.then(resposta => {
            setFilme(resposta.data);
        });
        requisicao.catch(err => console.log(err.resposta))


    }, [])
    console.log(filme)

    return (
        <>
            <div>
                <h2>Selecione o Horário</h2>
            </div>
            <div className="horario-filmes ">
                <h1 className="embelezar">Selecione seu horário</h1>
            </div>
            <div className="data">
                <>
                    {day.map(dia => {
                        return (
                            <>

                                <h3 key={dia.id} className="info">{dia.weekday} - {dia.date}</h3>
                                <div className="flex">
                                    {dia.showtimes.map((e) => {
                                        return (

                                            <Link to={`/Sessao/${e.id}`}>
                                                <h3 className="orange" key={e.id} >{e.name}</h3>

                                            </Link>


                                        )
                                    })}
                                </div>

                            </>
                        )
                    })}
                </>
            </div>
            <footer>
                <div className="flexionar">
                    <img className="tamanho-filme" src={filme.posterURL} alt={filme.title} />
                    <div className="titulo">
                        {filme.title}
                    </div>
                </div>
            </footer>

        </>

    )
}