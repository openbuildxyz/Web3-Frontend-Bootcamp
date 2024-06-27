import styles from './Dialog.module.css';

const Dialog = (props:any) => {
    const show = props.show;
    return show?(
        <div className={styles.mask}>
            <div className={styles.dialogContainer}>
                <div className={styles.tbar}>
                    <div>{props.title || "title"}</div>
                    <div className={styles.closeBtn} onClick={props.onClose}>
                        <svg t="1719394922853" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1461" width="20" height="20"><path d="M948.48 992a44.16 44.16 0 0 1-30.72-12.8L44.8 106.24C27.52 88.96 27.52 61.44 44.8 44.8s44.8-17.28 61.44 0L979.2 917.76c17.28 17.28 17.28 44.8 0 61.44a44.16 44.16 0 0 1-30.72 12.8z" fill="#cdcbcb" p-id="1462"></path><path d="M75.52 992a44.16 44.16 0 0 1-30.72-12.8 42.88 42.88 0 0 1 0-61.44L917.76 44.8c17.28-17.28 44.8-17.28 61.44 0s17.28 44.8 0 61.44L106.24 979.2c-8.32 8.32-19.2 12.8-30.72 12.8z" fill="#cdcbcb" p-id="1463"></path></svg>
                    </div>
                </div>
                <div className='flex1'>{props.children}</div>
                <div className={styles.btns}>
                    {
                    props.buttons ? props.buttons : 
                        (<>
                            <div className="ca-btn" onClick={props.onSubmit}>Confirm</div>
                            <div className="ca-btn-grey" onClick={props.onClose}>Cancel</div>
                        </>)
                    }
                </div>
            </div>
        </div>
        ):null
}
export default Dialog;