import { Button, Input, Select } from "antd"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import getCategories from "../service/getCategories"
import { UploadOutlined } from "@ant-design/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instance } from "../hooks/instance"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../context/Context"
import toast, { Toaster } from "react-hot-toast"

const ProductsCrud = () => {
    const {id} = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const {token} = useContext(Context)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
   

    const categories = getCategories("search")
    const [chooseImg, setChooseImg] = useState<string | null>(null)
    const [getImg, setGetImg] = useState<any>(null)

    const [productName, setProductName] = useState<string>("")
    const [category, setCategory] = useState<string | null>(null)
    const [cost, setCost] = useState<number | string>("")
    const [count, setCount] = useState<number | string>("")
    const [discount, setDiscount] = useState<number | string>("")
    const [description, setDescription] = useState<string>("")
    const [shortDescription, setShortDescription] = useState<string>("")
    const [status, setStatus] = useState<string | null>(null)
    const [size, setSize] = useState<string[] | null>(null)
    const [tags, setTags] = useState<string[] | null>(null)

    function handleChooseImg(e:ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            const file = e.target.files[0]
            setChooseImg(URL.createObjectURL(file))
            setGetImg(file)
        }
    }
    const addMutation = useMutation({
        mutationFn:(data:any) => instance().post("/product", data, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res => {
            const formData = new FormData()
            formData.append("file", getImg)
            instance().post("/media/upload-photo", formData, {
                params:{
                    id:res.data.product_id,
                },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        }),
        onSuccess:() => {
            toast.success("Products added")
            setTimeout(() => {
                setIsLoading(false)
                queryClient.invalidateQueries({queryKey:['products']})
                navigate(-1)
            },600)
        }
    })
    const editMutation = useMutation({
        mutationFn:(data:any) => instance().put("/product", data, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(() => {
            if(getImg){
                const formData = new FormData()
                formData.append("file", getImg)
                instance().post("/media/upload-photo", formData, {
                    params:{id},
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
            }
        }),
        onSuccess:() => {
            toast.success("Products updated")
            setTimeout(() => {
                setIsLoading(false)
                queryClient.invalidateQueries({queryKey:['products']})
                navigate(-1)
            },600)
        }
    })

    function handleAddProducts(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const data:any = {
            category_id:category,
            cost: cost,
            count: count,
            discount: discount,
            product_description: description,
            product_name: productName,
            product_status: status,
            short_description: shortDescription,
            size: size,
            tags: tags
        }
        if(id){
            data.product_id = id
            editMutation.mutate(data)
        }
        else{
            addMutation.mutate(data)
            setIsLoading(true)
        }
    }

    useEffect(() => {
        if(id){
            instance().get(`/product/${id}`).then(res => {
                setProductName(res.data.product_name)
                setCategory(res.data.category_id)
                setCost(res.data.cost)
                setCount(res.data.count)
                setDiscount(res.data.discount)
                setStatus(res.data.product_status)
                setDescription(res.data.product_description)
                setShortDescription(res.data.short_description)
                setSize(res.data.size)
                setTags(res.data.tags)
                setChooseImg(res.data.image_url ? res.data.image_url[0] : "https://picsum/photos/400/400")
            })  
        }
    },[id])
  return (
    <form onSubmit={handleAddProducts} className="p-5">
        <Toaster position="top-center" reverseOrder={false}/>
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-[25px]">Product {id ? "edit" : "create"}</h2>
            <Button loading={isLoading} htmlType="submit" type="primary" size="large">Save</Button>
        </div>
        <div className="flex justify-between mt-5">
            <div className="w-[49%] p-5 rounded-md border-[1px] border-slate-400 space-y-2">
                <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" size="large" />
                <Select     
                    value={category}
                    onChange={(e) => setCategory(e)}
                    allowClear
                    className="w-full"
                    placeholder="Choose category"
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    options={categories}
                />
                <Input value={cost} onChange={(e) => setCost(Number(e.target.value))} type="number" placeholder="Enter product price" size="large" />
                <Input value={count} onChange={(e) => setCount(Number(e.target.value))} placeholder="Enter product count" size="large" />
                <Input value={discount} onChange={(e) => setDiscount(Number(e.target.value))} placeholder="Enter product discount" size="large" />
            </div>
            <div className="w-[49%] p-5 rounded-md border-[1px] border-slate-400 space-y-2">
                 <Select     
                    value={status}
                    onChange={(e) => setStatus(e)}
                    allowClear
                    className="w-full"
                    placeholder="Choose status"
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    options={[{label:"New Arrivals", value:"new_arrivals"}, {label:"Sale", value:"sale"}]}
                />
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" size="large" />
                <Input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Enter product short description" size="large" />
                <Select 
                    mode="multiple"
                    className="w-full"
                    value={size}
                    onChange={(e) => setSize(e)}
                    placeholder="Choose size"
                    allowClear
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    options={[
                        {
                            label:"Small",
                            value:"Small",
                        },
                        {
                            label:"Medium",
                            value:"Medium",
                        },
                        {
                            label:"Large",
                            value:"Large",
                        }
                    ]}
                />
                <Select 
                    mode="multiple"
                    className="w-full"
                    value={tags}
                    onChange={(e) => setTags(e)}
                    placeholder="Choose tag"
                    allowClear
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    options={[
                        {
                            label:"All Plants",
                            value:"All",
                        },
                        {
                            label:"New Arrivals",
                            value:"new-arrivals",
                        },
                        {
                            label:"Sale",
                            value:"sale",
                        }
                    ]}
                />
            </div>
        </div>

        <div className="flex gap-10 mt-10">
            <label>
                <div className="p-2 rounded-md border-slate-400 border-[1px] w-[100px] flex items-center gap-2">
                    <UploadOutlined/>
                    <span>Upload</span>
                </div>
                <input onChange={handleChooseImg} className="hidden" type="file" />
            </label>
            <img src={chooseImg as string} alt="Choose img" width={400} height={300} />
        </div>
    </form>
  )
}

export default ProductsCrud