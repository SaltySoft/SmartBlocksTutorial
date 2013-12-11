<?php
/**
 *
 */
 
namespace ProjectBlock\Business;

class ProjectBusiness {

    
    public static function findAll() {
    
    }
    
    public static function find($id) {
    
    }
    
    public static function destroy($id) {
    
    }
    
    public static function createOrUpdate($data) {
        $project = null;
        if (isset($data['id'])) {
            $project = \ProjectBlock\Project::find($data['id']);
        }

        if (!is_object($project)) {
            $project = new \ProjectBlock\Project();
        }

        if (isset($data['name']))
            $project->setName($data['name']);

        if (isset($data['description']))
            $project->setDescription($data['description']);

        if (isset($data['tasks']) && is_array($data['tasks'])) {
            $project->getTasks()->clear();
            foreach ($data['tasks'] as $tarray) {
                $task = \TodoBlock\Business\TaskBusiness::createOrUpdate($tarray);
                if (!$project->getTasks()->contains($task))
                    $project->getTasks()->add($task);
            }
        }

        if ($project->getCreator() == \User::current_user()) {
            $project->save();
            return $project;
        } else {
            return null;
        }
    }
}