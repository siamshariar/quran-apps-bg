import Link from 'next/link'
import ArabicDialog from '../../components/core/arabic-dialog'

export default function SamplePage() {
	return (
		<div>
			<h1>Welcome to Sample Page</h1>
			<Link href="/" legacyBehavior>
				<a>Back To Home</a>
			</Link>
		</div>
	)
}
