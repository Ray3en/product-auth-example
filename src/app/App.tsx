import { StoreProvider } from "./providers/store-provider"
import { AppRouter } from "./routes/AppRouter"

function App() {
  return (
    <div className="bg-neutral-50">
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </div>
  )
}

export default App
