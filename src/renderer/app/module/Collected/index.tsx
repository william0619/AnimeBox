/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/
import { useState } from 'react'
import { Button } from '@renderer/components/ui/button.tsx'

const CollectedPage = () => {
  const [add, setAdd] = useState(0)

  return (
    <div>
      <Button
        onClick={() => {
          setAdd(add + 1)
        }}
      >
        add
      </Button>
      {add}
      CollectedPage
    </div>
  )
}

export default CollectedPage
