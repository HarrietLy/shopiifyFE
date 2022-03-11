
export default function Footer() {
    return (
        <div>
            <footer className="footer mt-auto py-3 bg-light text-center" style={{bottom:'0', position:'fixed', width:'100%'}}>

                {/* <div className="text-center p-4" style={{ "backgroundColor": "rgba(0, 0, 0, 0.05)" }}> */}
                    <div>© 2022 Copyright: Harriet Ly</div>
                    <div>
                        <a className="text-reset fw-bold" href="https://github.com/HarrietLy/shopiifyFE">Github</a>
                        {" "}<span><a className="text-reset fw-bold" href="https://www.linkedin.com/in/harrietly/">LinkedIn</a></span>
                    {/* </div> */}
                </div>

            </footer>
        </div>
    )
}
