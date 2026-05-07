'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { StoreDemo } from "@/lib/types";
import { ArrowRight, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function StoreDemoCard({ store }: { store: StoreDemo }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card key={store.name} className="w-auto mb-4">
            <CardHeader >
                <Avatar size="lg">
                    {store.logo && <AvatarImage src={store.logo} />}
                    {store.initials && <AvatarFallback>{store.initials}</AvatarFallback>}
                </Avatar>
                <CardTitle className="font-bold">{store.name}</CardTitle>
                <CardDescription className="text-xs">{store.industry}</CardDescription>
            </CardHeader>
            <CardContent>
                {store.description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                ))}
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center gap-4">
                <Field className="gap-1">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={store.password || ""}
                            {...(store.password ? { readOnly: true } : { disabled: true })}
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton size="icon-xs" onClick={() => {
                                setShowPassword(!showPassword);
                            }}>
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                <span className="sr-only">{showPassword ? "Hide" : "View"} Password</span>
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription className="text-xs">
                        {
                            store.password ? "This store is password protected, use this password to access the store."
                                : "This store is not password protected."
                        }
                    </FieldDescription>
                </Field>
                <Button className="w-full" variant="outline" asChild>
                    <a href={store.url} target="_blank" rel="noopener noreferrer">
                        Visit Store <ArrowRight className="ml-2" size={16} />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
};