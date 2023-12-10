import Link from 'next/link'

export default function ErrorPage() {
	return (
		<div className="wrap">
			<h1>404! Something Went Wrong.</h1>
			<Link href="/" prefetch={false}>
				<a>Back To Home</a>
			</Link>

			<style jsx>
			{`
				.wrap {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100vh;
				}

				h1, a {
					text-align: center;
					color: #444;
					display: block;
				}
			`}
			</style>
		</div>
	)
}
