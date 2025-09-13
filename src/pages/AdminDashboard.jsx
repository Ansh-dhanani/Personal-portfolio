import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const methods = useForm();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
    fetchData(activeTab);
  }, [activeTab, token, navigate]);

  const fetchData = async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${type}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleEdit = async (id, type, updatedData) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('No authentication token found. Please login again.');
        logout();
        navigate('/admin/login');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/${type}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        // Refresh data immediately after successful update
        await fetchData(type);
      } else {
        const errorData = await response.json();
        console.error('Edit failed:', response.status, response.statusText, errorData);
        if (response.status === 400 && errorData.message === 'Invalid token') {
          alert('Token expired. Please login again.');
          logout();
          navigate('/admin/login');
        } else {
          alert(`Failed to update item: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating item. Please check console for details.');
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('No authentication token found. Please login again.');
        logout();
        navigate('/admin/login');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Refresh data immediately after successful deletion
        await fetchData(type);
      } else {
        const errorData = await response.json();
        console.error('Delete failed:', response.status, response.statusText, errorData);
        if (response.status === 400 && errorData.message === 'Invalid token') {
          alert('Token expired. Please login again.');
          logout();
          navigate('/admin/login');
        } else {
          alert('Failed to delete item. Please check console for details.');
        }
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting item. Please check console for details.');
    }
  };

  const handleAdd = async (type, newData) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('No authentication token found. Please login again.');
        logout();
        navigate('/admin/login');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/admin/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        fetchData(type);
      } else {
        const errorData = await response.json();
        console.error('Add failed:', response.status, response.statusText, errorData);
        if (response.status === 400 && errorData.message === 'Invalid token') {
          alert('Token expired. Please login again.');
          logout();
          navigate('/admin/login');
        } else {
          alert(`Failed to add item: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Error adding item. Please check console for details.');
    }
  };

  const onSubmit = async (formData) => {
    const updates = {};
    const currentIds = data.map(item => item._id);
    Object.keys(formData).forEach(key => {
      const [id, field] = key.split('_', 2);
      if (currentIds.includes(id)) {
        if (!updates[id]) updates[id] = {};
        let value = formData[key];
        if (field === 'badges') {
          value = value.split(',').map(badge => badge.trim()).filter(badge => badge.length > 0);
        }
        updates[id][field] = value;
      }
    });

    for (const id in updates) {
      await handleEdit(id, activeTab, updates[id]);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <Button onClick={() => methods.handleSubmit(onSubmit)()}>Save All Changes</Button>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
        >
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Button onClick={() => handleAdd('projects', {
                title: 'New Project',
                description: 'New project description',
                video: 'https://example.com/video',
                date: new Date().toISOString().split('T')[0],
                badges: [],
                liveUrl: '',
                githubUrl: '',
                liveText: '',
                githubText: ''
              })}>
                Add Project
              </Button>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data.map((project) => (
                  <Card key={project._id} className="w-full">
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">

                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_title`}>Title</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_title`}
                              render={({ field }) => <Input id={`${project._id}_title`} defaultValue={project.title} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_description`}>Description</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_description`}
                              render={({ field }) => <Input id={`${project._id}_description`} defaultValue={project.description} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_video`}>Video URL</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_video`}
                              render={({ field }) => <Input id={`${project._id}_video`} defaultValue={project.video} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_date`}>Date</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_date`}
                              render={({ field }) => <Input id={`${project._id}_date`} type="date" defaultValue={project.date?.split('T')[0]} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_badges`}>Badges (comma-separated)</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_badges`}
                              render={({ field }) => <Input id={`${project._id}_badges`} defaultValue={Array.isArray(project.badges) ? project.badges.join(', ') : project.badges || ''} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_liveUrl`}>Live URL</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_liveUrl`}
                              render={({ field }) => <Input id={`${project._id}_liveUrl`} defaultValue={project.liveUrl} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_githubUrl`}>GitHub URL</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_githubUrl`}
                              render={({ field }) => <Input id={`${project._id}_githubUrl`} defaultValue={project.githubUrl} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_liveText`}>Live Text</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_liveText`}
                              render={({ field }) => <Input id={`${project._id}_liveText`} defaultValue={project.liveText} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${project._id}_githubText`}>GitHub Text</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${project._id}_githubText`}
                              render={({ field }) => <Input id={`${project._id}_githubText`} defaultValue={project.githubText} {...field} />}
                            />
                          </FormControl>
                        </FormItem>

                        <div className="flex justify-end space-x-4 mt-4">
                          <Button type="submit">Save</Button>
                          <Button variant="destructive" onClick={() => handleDelete(project._id, 'projects')}>
                            Delete
                          </Button>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Form>
        </TabsContent>

        <TabsContent value="experiences" className="mt-6">
          <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Button onClick={() => handleAdd('experiences', {
                companyName: 'New Company',
                position: 'New Position',
                logo: '/placeholder-logo.png',
                startDate: '2023-01-01',
                endDate: 'Present',
                description: 'New experience description'
              })}>
                Add Experience
              </Button>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data.map((experience) => (
                  <Card key={experience._id} className="w-full">
                    <CardHeader>
                      <CardTitle>{experience.position}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel htmlFor={`${experience._id}_companyName`}>Company Name</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${experience._id}_companyName`}
                              render={({ field }) => <Input id={`${experience._id}_companyName`} defaultValue={experience.companyName} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${experience._id}_position`}>Position</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${experience._id}_position`}
                              render={({ field }) => <Input id={`${experience._id}_position`} defaultValue={experience.position} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${experience._id}_logo`}>Logo</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${experience._id}_logo`}
                              render={({ field }) => <Input id={`${experience._id}_logo`} defaultValue={experience.logo} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${experience._id}_startDate`}>Start Date</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${experience._id}_startDate`}
                              render={({ field }) => <Input id={`${experience._id}_startDate`} defaultValue={experience.startDate} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${experience._id}_endDate`}>End Date</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${experience._id}_endDate`}
                              render={({ field }) => <Input id={`${experience._id}_endDate`} defaultValue={experience.endDate} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel htmlFor={`${experience._id}_description`}>Description</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${experience._id}_description`}
                              render={({ field }) => <Input id={`${experience._id}_description`} defaultValue={experience.description} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <Button type="submit">Save</Button>
                        <Button variant="destructive" onClick={() => handleDelete(experience._id, 'experiences')}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Form>
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Button onClick={() => handleAdd('education', {
                companyName: 'New University',
                position: 'New Degree',
                logo: '/placeholder-logo.png',
                startDate: '2023-01-01',
                endDate: 'Present',
                description: 'New education description'
              })}>
                Add Education
              </Button>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data.map((education) => (
                  <Card key={education._id} className="w-full">
                    <CardHeader>
                      <CardTitle>{education.position}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${education._id}_companyName`}
                              render={({ field }) => <Input defaultValue={education.companyName} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${education._id}_position`}
                              render={({ field }) => <Input defaultValue={education.position} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${education._id}_logo`}
                              render={({ field }) => <Input defaultValue={education.logo} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${education._id}_startDate`}
                              render={({ field }) => <Input defaultValue={education.startDate} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${education._id}_endDate`}
                              render={({ field }) => <Input defaultValue={education.endDate} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${education._id}_description`}
                              render={({ field }) => <Input defaultValue={education.description} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <Button type="submit">Save</Button>
                        <Button variant="destructive" onClick={() => handleDelete(education._id, 'education')}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Form>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Button onClick={() => handleAdd('skills', {
                tech: 'New Skill'
              })}>
                Add Skill
              </Button>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data.map((skill) => (
                  <Card key={skill._id} className="w-full">
                    <CardHeader>
                      <CardTitle>{skill.tech}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Tech</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${skill._id}_tech`}
                              render={({ field }) => <Input defaultValue={skill.tech} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <Button type="submit">Save</Button>
                        <Button variant="destructive" onClick={() => handleDelete(skill._id, 'skills')}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Form>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Button onClick={() => handleAdd('history', {
                title: 'New History Item',
                date: '2023-01-01',
                info: 'New history info',
                place: '',
                logo: '',
                githubUrl: '',
                siteUrl: ''
              })}>
                Add History
              </Button>
              {loading ? (
                <p>Loading...</p>
              ) : (
                data.map((history) => (
                  <Card key={history._id} className="w-full">
                    <CardHeader>
                      <CardTitle>{history.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_title`}
                              render={({ field }) => <Input defaultValue={history.title} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_date`}
                              render={({ field }) => <Input defaultValue={history.date} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Info</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_info`}
                              render={({ field }) => <Input defaultValue={history.info} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Place</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_place`}
                              render={({ field }) => <Input defaultValue={history.place} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_logo`}
                              render={({ field }) => <Input defaultValue={history.logo} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>GitHub URL</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_githubUrl`}
                              render={({ field }) => <Input defaultValue={history.githubUrl} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Site URL</FormLabel>
                          <FormControl>
                            <FormField
                              control={methods.control}
                              name={`${history._id}_siteUrl`}
                              render={({ field }) => <Input defaultValue={history.siteUrl} {...field} />}
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <Button type="submit">Save</Button>
                        <Button variant="destructive" onClick={() => handleDelete(history._id, 'history')}>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
