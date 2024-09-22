class JobScheduler

  def initialize(user_id, job_id)
    @user_id = user_id
    @job_id = job_id
  end

  def schedule_cron_job(job_class_name, cron_expression)
    Sidekiq::Cron::Job.create(
      name: job_name,
      cron: cron_expression,
      class: job_class_name,
      args: [@user_id, @job_id],
      queue: 'default'
    )
  end

  def update_job(cron_expression)
    job = fetch_job
    job.cron = cron_expression
    job.save
  end

  def delete_job
    job = fetch_job

    job.destroy
  end
  
  private

  def job_name
    "User::#{@user_id}#Job#{@job_id}"
  end

  def fetch_job
    Sidekiq::Cron::Job.find(job_name)
  end
end
