"use client"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(3, { message: "Store name should contain atleast 3 characters!" })
})


export const StoreModal = () => {
    const [loading, setLoading] = useState(false)
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/stores', value)
            toast.success("Store Created Successfully")
        } catch (error) {
            toast.error("Something Went Wrong!")
        } finally {
            setLoading(false)
        }
    }

    return <Modal
        title="Create Store"
        description="Add new store to start selling now!"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='E-commerce'
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button disabled={loading} variant={'outline'} onClick={storeModal.onClose}>
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                disabled={loading}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
}