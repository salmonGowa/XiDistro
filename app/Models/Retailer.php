<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['tenant_id', 'shop_name', 'phone', 'location'])]
class Retailer extends Model
{
    use BelongsToTenant;
}
