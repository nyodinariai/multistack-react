
const MeusCursos = [
    {
        id: '1',
        nome: 'React'
    },
    {
        id: '2',
        nome: 'Next.js'
    }
]

export default function cursos(request, response) {
    const id = request.query.cursoId,
        curso = MeusCursos.find(meuCurso => meuCurso.id === id);
    
    if (curso) {
        response.status(200).json(curso)
    } else {
        response.status(404).json({
            mensagem: 'Curso não encontrado'
        })
    }
    
}