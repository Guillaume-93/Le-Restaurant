import './Loader.css';

export default function Loader({ inline }) {
    return (
        <div className={`loader__container ${inline ? 'loader__inline' : ''}`}>
            <div className="loader className={`mx-auto  rounded-md object-cover shadow-default ${sectionName === 'heroSection' ? 'h-20 w-20' : 'h-52 w-52'}`}"></div>
            {!inline && "Loading..."}
        </div>
    );
}
