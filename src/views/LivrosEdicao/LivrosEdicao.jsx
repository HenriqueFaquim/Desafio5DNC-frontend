import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {
  let {livroId} = useParams();

  const [livro, setLivro] = useState([])

  async function getLivro(){
    const {data } = await LivrosService.getLivro(livroId);
    setLivro(data.message[0])
  }

  async function editLivro(){
    const body = {
        id:Number(livro.id),
        title:livro.title,
        pages: Number(livro.pages),
        ISBN: livro.ISBN,
        editora: livro.editora
      }
    if(livro.id!=undefined && livro.id!='' && livro.title!=undefined && livro.title!='' && livro.pages!=undefined && livro.pages!='' && livro.ISBN !=undefined && livro.ISBN !='' && livro.editora !=undefined && livro.editora !=''){
      await LivrosService.updateLivro(Number(livro.id),body)
      .then(({data})=>{
        alert(data.statusMessage)
        console.log(data.statusMessage)
      })
      .catch(({response:{data,status}})=>{
        alert(`${status} - ${data}`)
        console.log(data.statusMessage)
      });
    }

  }

  useEffect(() => {
    getLivro()
  }, [])

  return (
  <>
    <Header/>
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required onChange={(event)=>{ setLivro({...livro, id: event.target.value})}} value={livro.id || ''}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}} value={livro.title || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, pages: event.target.value})}} value={livro.pages || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, ISBN: event.target.value})}} value={livro.ISBN || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, editora: event.target.value})}} value={livro.editora || ''}></input>
            </div>
            <div className='form-group'>
              <button type='button' onClick={()=>{
              editLivro()
            }}>Atualizar Livro</button>
            </div>
          </form>
          </div>
    </div>
  </>)
}

export default LivrosEdicao