<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:repositories {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create repositories CLI';

    public function handle()
    {
        $name = $this->argument('name');
        $repositoryFolder = base_path('app/Repositories/'.$name);
        if(!File::exists($repositoryFolder)) {
            File::makeDirectory($repositoryFolder, 0755, true, true);

            $repositoryFile = $repositoryFolder.'/'.$name.'Repository.php';
            if(!File::exists($repositoryFile)) {
                $repositoryFileContent = file_get_contents(app_path('Console/Commands/Templates/Repository.txt'));
                $repositoryFileContent = str_replace('{name}', $name, $repositoryFileContent);
                File::put($repositoryFile, $repositoryFileContent);
            }   

            $repositoryInterfaceFile = $repositoryFolder.'/'.$name.'RepositoryInterface.php';
            if(!File::exists($repositoryInterfaceFile)) {
                $repositoryInterfaceFileContent = file_get_contents(app_path('Console/Commands/Templates/RepositoryInterface.txt'));
                $repositoryInterfaceFileContent = str_replace('{name}', $name, $repositoryInterfaceFileContent);
                File::put($repositoryInterfaceFile, $repositoryInterfaceFileContent);
            }

            $this->info('Repositories created successfully!');
        }else{
            $this->error('Repositories already exists!');
            return 1;
        }
    }
}
