<?php

namespace App\Providers;

use App\Repositories\Category\CategoryRepository;
use App\Repositories\Category\CategoryRepositoryInterface;
use App\Repositories\Course\CourseRepository;
use App\Repositories\Course\CourseRepositoryInterface;
use App\Repositories\Document\DocumentRepository;
use App\Repositories\Document\DocumentRepositoryInterface;
use App\Repositories\Lesson\LessonRepository;
use App\Repositories\Lesson\LessonRepositoryInterface;
use App\Repositories\Student\StudentRepository;
use App\Repositories\Student\StudentRepositoryInterface;
use App\Repositories\Teacher\TeacherRepository;
use App\Repositories\Teacher\TeacherRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Video\VideoRepository;
use App\Repositories\Video\VideoRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );
        $this->app->bind(
            StudentRepositoryInterface::class,
            StudentRepository::class
        );
        $this->app->bind(
            TeacherRepositoryInterface::class,
            TeacherRepository::class
        );
        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
        );
        $this->app->bind(
            CourseRepositoryInterface::class,
            CourseRepository::class
        );
        $this->app->bind(
            LessonRepositoryInterface::class,
            LessonRepository::class
        );
        $this->app->bind(
            DocumentRepositoryInterface::class,
            DocumentRepository::class
        );
        $this->app->bind(
            VideoRepositoryInterface::class,
            VideoRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
