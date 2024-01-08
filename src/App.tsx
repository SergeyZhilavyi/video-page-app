import { useState } from 'react'
import "./index.css"
import { useAppSelector } from './hooks/redux'
import CategoryPills from './components/CategoryPills'
import { PageHeader } from "./layouts/PageHeader"
import { useGetVideoQuery } from './services/VideoService'
import { VideoGridItem } from './components/VideoGridItem'
import { SidebarProvider } from './contexts/SidebarContext'
import { Sidebar } from './layouts/Sidebar'

function App() {
  const {categories} = useAppSelector((state) => state.app)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const {data: videos, error, isLoading} = useGetVideoQuery(null)

  return (
    <SidebarProvider>
        <div className="max-h-screen flex flex-col" >
          <PageHeader />
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
            <div className="overflow-x-hidden px-8 pb-4">
              <div className="sticky top-0 bg-white z-10 pb-4">
                <CategoryPills
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>

              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {isLoading && <div>Загрузка...</div>}
                {error && <div>Ошибка загрузки...</div>}
                {videos &&  videos.map(video => (
                    <VideoGridItem key={video.id} {...video} />
                  ))
                }
              </div>
            </div>
          </div>
      </div>
    </SidebarProvider>
  )
}

export default App
