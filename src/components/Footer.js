
export default function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-light text-muted">

                <div className="text-center p-4" style={{ "backgroundColor": "rgba(0, 0, 0, 0.05)" }}>
                    <div>© 2022 Copyright: Harriet Ly</div>
                    <div>
                        <a className="text-reset fw-bold" href="https://www.linkedin.com/in/harrietly/">Github</a>
                        {" "}<span><a className="text-reset fw-bold" href="https://www.linkedin.com/in/harrietly/">LinkedIn</a></span>
                    </div>
                    <div> Groceries name and description reference: <a className="text-reset" href="https://github.com/marcusklasson/GroceryStoreDataset">grocery dataset</a></div>
                </div>

            </footer>
        </div>
    )
}
