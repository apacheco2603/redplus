import { useState, useEffect } from 'react';

function GroupForum({ group, setPantalla }) {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    if (!group) return;

    let mockPosts = [];
    if (group.id === 'redes') {
      mockPosts = [
        {
          id: 1, autor: 'sysadmin_pe', titulo: 'Guía para rescatar datos de discos dañados (Toshiba)',
          contenido: 'Acabo de hacer un clonado exitoso hacia un disco secundario. Recomiendo muchísimo bootear en Fedora y ejecutar ddrescue por consola. Me saltó varios sectores defectuosos pero salvó casi toda la estructura de archivos.',
          comentarios: ['Buenísimo el dato de ddrescue, te salva la vida.', '¿Tuviste que montar la partición en solo lectura antes?']
        },
        {
          id: 2, autor: 'hardware_fixer', titulo: 'Ayuda con corto en PCB modelo BF41-00354A',
          contenido: 'Identifiqué un cortocircuito en la placa base de un disco duro de 1TB. ¿Alguien tiene experiencia usando la herramienta Mechanic iX5 Ultra para precalentar y reemplazar los componentes SMD aquí? No quiero dañar las pistas.',
          comentarios: ['Yo tengo esa precalentadora, funciona excelente si controlas bien la curva de temperatura.', 'Cuidado con la ROM, es lo más importante de esa PCB.']
        }
      ];
    } else if (group.id === 'frontend') {
      mockPosts = [
        {
          id: 1, autor: 'react_ninja', titulo: 'Integrar separación de audio en la web',
          contenido: '¿Alguien sabe si es viable usar WebAssembly para correr modelos tipo MDX-NET directamente en el navegador? Como lo que hace Ultimate Vocal Remover 5, pero sin tener que instalar nada en la PC del usuario.',
          comentarios: ['Pesaría muchísimo el modelo, pero con WebGPU quizá sea viable pronto.', 'Interesante idea, revisa la librería ONNX Runtime Web.']
        },
        {
          id: 2, autor: 'ui_designer', titulo: 'Mis primeros custom hooks',
          contenido: 'Hice un hook simple para manejar contadores y me ahorra muchísimo código repetido. Vitejs lo compila rapidísimo.',
          comentarios: ['¡Excelente! El siguiente paso es hacer uno para llamadas fetch.']
        }
      ];
    } else {
      mockPosts = [
        {
          id: 1, autor: 'tech_user', titulo: `Bienvenidos al foro de ${group.name}`,
          contenido: 'Este es un espacio para compartir proyectos y dudas. ¡Siéntanse libres de publicar!',
          comentarios: ['¡Genial estar por aquí!']
        }
      ];
    }
    setPublicaciones(mockPosts);
  }, [group]);

  if (!group) return null;

  return (
    <main className="content-feed">
      {/* Cabecera del foro con el botón para ir al chat en vivo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => setPantalla('groups')}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-main)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ⬅ Volver
          </button>
          <h2 style={{ margin: '0' }}>r/{group.name}</h2>
        </div>
        
        <button 
          onClick={() => setPantalla('groupChat')}
          style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          💬 Chat en Vivo
        </button>
      </div>

      {/* Caja para crear una publicación (Simulada visualmente) */}
      <div className="project-card" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Crear una publicación..." 
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
          readOnly
        />
        <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Publicar
        </button>
      </div>

      {/* Lista de Publicaciones (Estilo Reddit) */}
      {publicaciones.map((post) => (
        <div key={post.id} className="project-card" style={{ marginBottom: '15px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Publicado por u/{post.autor}</span>
          <h3 style={{ margin: '8px 0', fontSize: '1.2rem' }}>{post.titulo}</h3>
          
          <div style={{ background: 'var(--bg-main)', padding: '15px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px', lineHeight: '1.5' }}>
            {post.contenido}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--text-muted)' }}>Comentarios ({post.comentarios.length})</h4>
            {post.comentarios.map((comentario, i) => (
              <div key={i} style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: '8px', marginBottom: '8px', fontSize: '13px' }}>
                {comentario}
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export default GroupForum;