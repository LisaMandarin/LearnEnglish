export function Footer() {
    const year = new Date().getFullYear()
    return (
        <div style={{textAlign: "center", marginTop: '24px'
        }}>
            Copyright &copy;{year} Min-ting Chuang
        </div>
    )
}