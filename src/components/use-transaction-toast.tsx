import { toast } from 'sonner'


export function useTransactionToast() {
  return (signature: string) => {
    toast('Transaction sent', {
      description: (
        <a
          href={`https://explorer.solana.com/tx/${signature}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Transaction
        </a>
      )
    })
  }}
