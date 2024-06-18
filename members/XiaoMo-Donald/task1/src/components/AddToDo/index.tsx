import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Input} from "@/components/ui/input"
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form"
import type {AddMapCallbackEventTypes, IComponentPropsBase, ITodoItem} from "@/types";

interface IProps extends IComponentPropsBase<AddMapCallbackEventTypes> {
}

const formSchema = z.object({
    title: z.string().optional(),
})


const AddToDo = ({onCallbackEvents}: IProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (!data.title) {
            onCallbackEvents({type: "empty", data: "请填写待办事项"})
            return;
        }
        const todoData: ITodoItem = {
            id: undefined,
            title: data.title,
            description: data.title,
            state: "doing",
            createdAt: undefined,
            completeAt: undefined
        }
        onCallbackEvents({type: "add", data: todoData})
        form.reset({
            title: ""
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-2 flex">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem className="grow">
                                <FormControl>
                                    <Input placeholder="请输入待办内容搜索/保存" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2 flex-shrink-0">
                        <Button type="button" onClick={() => onCallbackEvents({type: "search", data: form.getValues().title})}>搜索</Button>
                        <Button type="submit">保存</Button>
                        <Button type="button" onClick={() => onCallbackEvents({type: "addModal"})}>添加</Button>
                        {/*<Button type="button" onClick={() => onCallbackEvents({type: "refresh"})}>刷新</Button>*/}
                    </div>
                </form>
            </Form>
        </>
    );
}

export default AddToDo;
