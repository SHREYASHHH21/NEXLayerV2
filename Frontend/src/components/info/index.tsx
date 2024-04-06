'use client'
import React from 'react'
import Button from '../ui/button'
import { useRouter } from 'next/navigation'

const Info = () => {
    const router=useRouter()
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full p-2  gap-2'>
            <div className='border rounded-md flex flex-col border-purple-600'>
                <h2 className='font-bold text-3xl mx-auto mt-6 text-purple-500' >Head</h2>
                <div className='p-8 text-xl'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio ad pariatur magnam animi possimus? Facilis necessitatibus ex iusto itaque exercitationem maiores, blanditiis nihil omnis odit consequatur mollitia, repudiandae, a quia.
                    Cumque modi ad nihil repellat aperiam perspiciatis molestias earum quo consequatur repellendus fuga adipisci, officia, nemo, maiores delectus porro! Nulla labore, eveniet doloremque expedita veritatis nobis. Quibusdam autem cupiditate dicta!
                    Distinctio animi eos dolorum a asperiores explicabo quo reprehenderit corporis hic nesciunt expedita laborum voluptatibus recusandae perferendis vero molestias id, est possimus necessitatibus exercitationem saepe sequi? Voluptas maiores inventore voluptate!
                    Facere vitae aut delectus maxime? Quam, cupiditate quia inventore similique libero rerum omnis? Molestiae, sequi doloribus. Voluptatem, porro. Laudaluptatem numquam eum ex ut?
                    Distinctio animmquam, incidunt neque eius consequuntur ut mollitia, harum fuga quidem sint, architecto aliquam molestias ipsa? Cum molestiae tempora modi earum beatae ipsam commodi eveniet corrupti ullam ad.
                </div>
                <Button variant='shimmer' className='mx-auto mt-auto mb-4' onClick={()=>router.push("/stake")}>Stake Now</Button>
            </div>
            <div className='border rounded-md flex flex-col border-purple-600'>
                <h2 className='font-bold text-3xl mx-auto mt-6 text-purple-500'>Head</h2>
                <div className='p-8 text-xl'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed ea delectus inventore? Laboriosam est nostrum aliquam commodi molestiae consequatur iste distinctio suscipit necessitatibus aut, vero ea? Velit ipsa earum ducimus?
                    Iste in nostrum enim corporis aperiam praesentium veritatis quia quis, quibusdam dolor assumenda ipsa esse quidem amet voluptas quo nemo asperiores? Nostrum deserunt dignissimos est alias beatae ex repellat nulla?
                    Mollitia ducimus aperiam deserunt cum ea aut possimus, similique molestiae eum earum nesciunt rem facilis nam delectus, facere ut sapiente, repudiandae consectetur mol
                    Cumque quia, vel voluptas similique unde sequi eveniet, doloremque facilis soluta optio fugit, quod maiores repellat quo excepturi ex nobis nisi modi dignissimos earum autem id? Nesciun numquam, perferendis magni, tenetur illo magnam obcaecati alias. Praesentium neque optio expedita autem saepe, odit amet quae ipsum! Nobis temporibus ducimus beatae adipisci rerum?
                    Autem, eligendi odit quisquam esse hic ea nihil ullam quo consequatur expedita, nulla, laborum exercitationem at! Unde natus nisi quia nobis sint laboriosam ab culpa pariatur minus, voluptatem quis sunt?
                </div>
                <Button className='mx-auto  mt-auto px-3 py-2 mb-4' variant='shimmer' onClick={()=>router.push("/")}>Restake Now</Button>
            </div>

        </div>
    )
}

export default Info
