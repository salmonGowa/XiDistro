<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'tenant' => [
                'id' => $this->tenant->id,
                'name' => $this->tenant->name,
                'phone' => $this->tenant->phone,
                'subscription_status' => $this->tenant->subscription_status,
            ],
        ];
    }
}
