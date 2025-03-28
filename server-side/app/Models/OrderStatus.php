<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;
    protected $table = 'orders_status';
    protected $fillable = [
        'name',
        'color'
    ];
    public function orders() {
        return $this->hasMany(Order::class, 'order_status_id', 'id');
    }
}
