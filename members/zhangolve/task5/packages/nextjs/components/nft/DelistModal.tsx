
const DelistModal = ({onDelist, token})=> {
    return (
        <>
        <button className="btn" onClick={()=>document?.getElementById('my_modal_1')?.showModal()}>Delist</button>
        <dialog id="my_modal_1" className="modal"> 
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Are you sure you want to delist this NFT from the market</p>
            <div className="modal-action">
            <form method="dialog">
                <button className="btn">No</button>
            </form>
            <button className="btn" onClick={async ()=>{
                await onDelist([token.listingId]);
                document?.getElementById('my_modal_1')?.close();
            }}>Yes</button>
            </div>
        </div>
        </dialog>
        </>
    )
}

export default DelistModal;