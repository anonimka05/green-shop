import { useContext, useState } from "react"
import { Context } from "../context/Context"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../hooks/instance"
import { Button, Modal } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import toast, { Toaster } from "react-hot-toast"

const ProductsMore = () => {
    const {id} = useParams()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const {token} = useContext(Context)
    const navigate = useNavigate()

    const {data:productMore = {}} = useQuery({
        queryKey:['productMore'],
        queryFn:() => instance().get(`/product/${id}`).then(res => res.data)
    })
    
    const deleteMutation = useMutation({
        mutationFn:() => instance().delete(`/product/${id}`, {
            headers:{"Authorization":`Bearer ${token}`}
        }),
        onSuccess:() => {
            setDeleteModal(false)
            toast.success("Successfully deleted")
            queryClient.invalidateQueries({queryKey:['products']})
            setTimeout(() => navigate(-1), 300)
        }
    })
    
  return (
    <div className="py-5">
        <Toaster position="top-center" reverseOrder={false}/>
        <div className="px-5 py-[22.1px] border-b-[2px] border-[#46a358]">
            <div className=" flex items-end justify-between">
                <h2 className="font-bold text-[25px]">{productMore?.product_name}</h2>
                <div className="space-x-5">
                    <Button onClick={() => setDeleteModal(true)} className="!bg-red-500 text-white border-transparent hover:!bg-transparent hover:!text-red-500 hover:!border-red-500" size="large" color="danger" icon={<DeleteOutlined/>}></Button>
                    <Button onClick={() => navigate("edit")} className="!bg-orange-300 text-white border-transparent hover:!bg-transparent hover:!text-orange-300 hover:!border-orange-300" size="large" color="danger" icon={<EditOutlined/>}></Button>
                </div>
            </div>
        </div>
        <div className="flex justify-between p-5">
            <ul className="w-[49%] border-[2px] border-slate-400 p-5 rounded-md space-y-5">
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">ID</span>
                    <strong>{productMore.product_id}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product name</span>
                    <strong>{productMore.product_name}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product description</span>
                    <strong>{productMore.product_description}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product short-description</span>
                    <strong>{productMore.short_description}</strong>
                </li>
            </ul>
            <ul className="w-[49%] border-[2px] border-slate-400 p-5 rounded-md space-y-5">
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product price</span>
                    <strong>${productMore.cost}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product discount</span>
                    <strong>${productMore.discount}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product count</span>
                    <strong>{productMore.count}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product status</span>
                    <strong>{productMore.product_status}</strong>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product size</span>
                    <div className="flex items-center gap-5">
                        {productMore.size?.map((item:string, index:number) => <Button key={index} type="dashed">{item}</Button>)}
                    </div>
                </li>
                <li className="flex flex-col">
                    <span className="text-[15px] text-slate-400">Product tags</span>
                    <div className="flex items-center gap-5">
                        {productMore.tags?.map((item:string, index:number) => <Button key={index} type="dashed">{item}</Button>)}
                    </div>
                </li>
            </ul>
        </div>
        <div className="border-[2px] w-[400px] mx-auto border-slate-300 rounded-md">
            <img src={productMore.image_url ? productMore.image_url[0] : "https://picsum.photos/id/2/400/400"} width={400} height={400}/>
        </div>

        <Modal open={deleteModal} onCancel={() => setDeleteModal(false)} onOk={() => deleteMutation.mutate()}>
            <h2 className="font-bold text-center text-[25px]">Are you sure to delete this product?</h2>
        </Modal>
    </div>
  )
}

export default ProductsMore