<?php
namespace App\Repositories\OrderStatus;

use App\Models\OrderStatus;
use App\Repositories\BaseRepository;
use App\Repositories\OrderStatus\OrderStatusRepositoryInterface;

class OrderStatusRepository extends BaseRepository implements OrderStatusRepositoryInterface{
    public function getModel(){
        return OrderStatus::class;
    }
}