import pluss from '../assets/pluss.svg';

interface Props{
    onClick: () => void
}


export function AddButton({onClick}: Props){

    return (
        <button className="btn btn-success shadow-lg position-fixed bottom-0 end-0 m-3 p-2" onClick={onClick}>
            <img src={pluss} width={30} height={30}/>
        </button>
    );
}