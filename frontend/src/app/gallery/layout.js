export default function FoodProductLayout({children, recommendation, modal}) {
    return (<div>
                <section>{children}</section>
                <div>{recommendation}</div>
                <div>{modal}</div>
            </div>)
}