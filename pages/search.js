import { server } from '../lib/config'
import Link from 'next/link'

export default function SamplePage() {
	return (
		<div>
			<h1>Welcome to Sample Page</h1>
			<Link href="/">
				<a>Back To Home</a>
			</Link>
		</div>
	)
}
