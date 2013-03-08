require 'capistrano/ext/multistage'
load 'deploy' if respond_to?(:namespace) # cap2 differentiator
set :stages, %w(prod)
set :default_stage, "prod"

set :application, "arpg"
set :node_file, "app.js"

set :repository, "git@bitbucket.org:jasonmcleod/arpg.git"
set :branch, "master"
set :deploy_to, "/var/www/#{application}"

set :keep_releases, 5
set :scm, :git
set :deploy_via, :remote_cache
set :normalize_asset_timestamps, false

namespace :deploy do
  task :start, :roles => :app, :except => { :no_release => true } do
    # run "forever start #{application}"
    run "cd #{deploy_to}/current && forever start -al forever.log -ao out.log -ae err.log app.js"
  end

  task :stop, :roles => :app, :except => { :no_release => true } do
    # run "forever stop #{application}"
    run "cd #{deploy_to}/current && forever stop -al forever.log -ao out.log -ae err.log app.js"
  end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "cd #{deploy_to}/current && forever stop -al forever.log -ao out.log -ae err.log app.js"
    run "cd #{deploy_to}/current && forever start -al forever.log -ao out.log -ae err.log app.js"
  end

  task :install_dependent_packages, :roles => :app do
    run "cd #{release_path} && npm install --production --quiet"
  end
end

after 'deploy:update_code', 'deploy:install_dependent_packages'
after 'deploy', 'deploy:cleanup'