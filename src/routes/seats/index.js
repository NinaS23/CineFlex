
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';


import "./style.css";


export default function Seats() {
    const { idSessao } = useParams();
    console.log("idSessao", idSessao)
    const navigate = useNavigate();
    const [selectedSeat, setSelectedSeat] = useState("")
    const [filme, setFilme] = useState([])
    const [seats, setSeats] = useState([])
    const [name, setName] = useState("")
    const [CPF, setCPF] = useState("")
    const [session, setSession] = useState({
        movie: {},
        day: {},
        seats: [],
        time: ''
    });

    useEffect(() => {

        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        requisicao.then(resposta => {
            setSession({
                ...session,
                movie: resposta.data.movie,
                day: resposta.data.day,
                seats: resposta.data.seats,
                time: resposta.data.name
            });

            console.log(resposta.data.seats)
            setSeats(resposta.data.seats)
            console.log(resposta.data.movie)
            setFilme(resposta.data.movie)


        });
        requisicao.catch(err => console.log(err.resposta))

    }, []);



    console.log(seats)
    let assento = seats.map(seat => {
        return {
            ...seat,
            t: false,

        }
    })

    console.log(assento)
    function tapSeat(indexSeat) {
        let SeatsNew = assento.map((value, index) => {
            if (index === parseInt(indexSeat) - 1) {

                return {

                    ...value,
                    isAvailable: "selected",


                }
            } else {
                return {
                    ...value,



                }
            }
        })
        setSelectedSeat([...selectedSeat, indexSeat])
        setSeats([...SeatsNew])
    }
    function RemoveSeats(indexSeat) {
        let SeatsNew = assento.map((value, index) => {
            if (index === parseInt(indexSeat) - 1) {

                return {

                    ...value,
                    isAvailable: false,


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

    function EnviarInfo(event) {
      
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", { ids: selectedSeat, name: name, cpf: CPF })
        promise.then(Sucesso)
        promise.catch(Error)
    }


    function Error(erro) {
        alert("deu erro ao enviar as informações , sinto muito , tente novamente")
        console.log(erro)
    }


    function Sucesso(resposta , event ) {
        
        if (name !== "" && CPF !== "") {
            
            navigate("/sucesso", {
                state: {
                    assentos: [...seats],
                    comprador: { nome: name, cpf: CPF },
                    movie: session.movie.title,
                    time: session.time,
                    date: session.day.date,
                    name: name,
                    cpf: CPF
                }
            })
        } else {
            alert("preencha os dados corretamente")
        }
    }
    function Indisponível() {
        alert("este assento está indisponivel")
    }

 

        return (
            <>
                <main>
                    <div className='flex'>
                        <h2 className="afastar embelezar">selecione os assentos</h2>
                    </div>
                    <div className="assentos">

                        {seats.map((e, index) => {
                            if (e.isAvailable === true) {
                                return (
                                    <p onClick={Indisponível} key={index} className="selected">{e.name}</p>
                                )
                            } else if (e.isAvailable === "selected") {
                                return (
                                    <p onClick={() => RemoveSeats(e.name)} key={index} className="azul">{e.name}</p>
                                )
                            } else {
                                return (
                                    <p onClick={() => tapSeat(e.name)} key={index} className="botao">{e.name}</p>
                                )
                            }
                        })}

                        <div className="selecao" >

                            <div className="alinhar">
                                <div className="bolinha-azul"></div>
                                <h3 className="alert">selecionado</h3>
                            </div>

                            <div className="alinhar">
                                <div className="bolinha-cinza"></div>
                                <h3 className="alert">Disponível</h3>
                            </div>
                            <div className="alinhar">
                                <div className="bolinha-amarela"></div>
                                <h3 className="alert">Indisponível</h3>
                            </div>
                        </div>
                        
                            <div className="inputs">
                                <div>
                                    <h2>Nome do comprador:</h2>
                                    <input className="nome" type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome..." />
                                </div>
                                <div>
                                    <h2>Nome do comprador:</h2>
                                    <input className="nome" type="text" value={CPF}name="name" onChange={(e) => setCPF(e.target.value)} placeholder="Digite seu CPF..." />
                                </div>

                            </div>
                            <div className='centralizar'>
                                <div onClick={EnviarInfo} className='clicar central empurrar'><h2>Reservar assento(s)</h2></div>
                            </div>
                        </div>
                 
                    <footer>
                        <div className="flexionar">
                            <img className="tamanho-filme" src={filme.posterURL} alt={filme.overview} />
                            <div className="titulo">
                                {filme.title}
                            </div>
                        </div>
                    </footer>
                </main>

            </>
        )
    }
