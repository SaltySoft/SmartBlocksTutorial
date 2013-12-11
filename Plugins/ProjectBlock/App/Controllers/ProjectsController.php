<?php
/**
 *
 */
 
namespace ProjectBlock;

use ProjectBlock\Business\ProjectBusiness;

class ProjectsController extends \Controller {

    public function index() {
        $qb = \Model::getEntityManager()->createQueryBuilder();

        $qb->select('p')->from('\ProjectBlock\Project', 'p')->where('p.creator = :user')->setParameter('user', \User::current_user());

        $result = $qb->getQuery()->getResult();

        $response = array();
        foreach ($result as $r) {
            $response[] = $r->toArray();
        }

        if (\User::current_user() != null) {
            $this->return_json($response);
        } else {
            $this->json_error('You need to be connected');
        }
    }
    
    public function show($params = array()) {
        $project = \ProjectBlock\Project::find($params['id']);
        if (is_object($project) && $project->getCreator() == \User::current_user()) {
            $this->return_json($project->toArray());
        } else {
            $this->json_error('The project was not found', 404);
        }
    }
    
    public function create($params = array()) {
        $data = $this->getRequestData();
        $project = ProjectBusiness::createOrUpdate($data);
        if (is_object($project)) {
            $this->return_json($project->toArray());
        } else {
            $this->json_error('The project could not be created', 403);
        }
    }
    
    public function update($params = array()) {
        $data = $this->getRequestData();
        $data['id'] = $params['id'];
        $project = ProjectBusiness::createOrUpdate($data);
        if (is_object($project)) {
            $this->return_json($project->toArray());
        } else {
            $this->json_error('The project was not found', 404);
        }
    }
    
    public function destroy($params = array()) {
        $project = \ProjectBlock\Project::find($params['id']);
        if (is_object($project) && $project->getCreator() == \User::current_user()) {
            $project->delete();
            $this->json_message('The project was successfully deleted');
        } else {
            $this->json_error('The project was not found', 404);
        }
    }
}