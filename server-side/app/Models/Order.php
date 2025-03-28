<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'student_id',
        'total',
        'discount',
        'coupon_code',
        'order_status_id',
        'payment_date',
        'payment_complete_date'
    ];
    public function ordersStatus() {
        return $this->belongsTo(OrderStatus::class, 'order_status_id', 'id');
    }
    public function orderDetail() {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
    public function student() {
        return $this->belongsTo(Student::class);
    }
}
