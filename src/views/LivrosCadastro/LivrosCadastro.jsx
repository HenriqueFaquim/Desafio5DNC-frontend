import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState([])

  async function createLivro(){
    const body = {
        id:Number(livro.id),
        title:livro.title,
        pages: Number(livro.pages),
        ISBN: livro.ISBN,
        editora: livro.editora
      }
      if(livro.id!=undefined && livro.id!='' && livro.title!=undefined && livro.title!='' && livro.pages!=undefined && livro.pages!='' && livro.ISBN !=undefined && livro.ISBN !='' && livro.editora !=undefined && livro.editora !=''){
      await LivrosService.createLivro(body)
      .then((response)=>{
        alert(response.data.statusMessage)
        document.getElementById('formulario').reset
      })
      .catch(({response:{data,status}})=>{
        console.log(data)
        alert(`ERRO(${status}) - ${data.statusMessage}`)

      });
    }

  }

  return (
  <>
    <Header/>
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
          <div className='form-group'>
            <label>Id</label>
            <input type="text" id='id' required onChange={(event)=>{ setLivro({...livro, id: event.target.value})}} ></input>
          </div>
          <div className='form-group'>
            <label>Titulo</label>
            <input type="text" id='titulo' required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Número de Páginas</label>
            <input type="text" id='num' required onChange={(event)=>{ setLivro({...livro, pages: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>ISBN</label>
            <input type="text" id='isbn' required onChange={(event)=>{ setLivro({...livro, ISBN: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Editora</label>
            <input type="text" id='editora' required onChange={(event)=>{ setLivro({...livro, editora: event.target.value})}}></input>
          </div> 
          <div className='form-group'>
            <button type='button' onClick={()=>{
              createLivro()
            }}>Cadastrar Livro</button>
          </div>
          </form>
        </div>
    </div>
  </>)
  
}

export default LivrosCadastro