import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css"


function Movies({id,title,url}){
    return (
        <Link to={`filme/${id}`}>
            <section key={id} className="filmes" >
                <img className="imagem" src={url} alt={title} />
                </section>
        </Link>
    )
}

export default function Movie(){
        const [filmes, setFilmes] = useState([])
        useEffect(() => {
    
            const requisicao = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
    
            requisicao.then(resposta => {
                setFilmes(resposta.data);
            });
            requisicao.catch(err => console.log(err.resposta))
        }, []);
        console.log(filmes)

        return(
        <>
            <div className="afastar">
                <div className="sub-titulo">
                    <h2 className="letter">Selecione o filme</h2>
                </div>
                <div className="movies">
                  {filmes.map((filme , index) =>{
                      return(
                        <Movies
                        id={filme.id}
                        url={filme.posterURL}
                        title={filme.title}
                        
                        />
                      )
                  })}
                </div>
            </div>
        </>
    )
}